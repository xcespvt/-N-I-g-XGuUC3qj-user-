
'use server';
/**
 * @fileOverview A support chat AI agent that handles audio input.
 *
 * - supportChatAudio - A function that handles the support chat process with audio.
 * - SupportChatAudioInput - The input type for the supportChatAudio function.
 * - SupportChatAudioOutput - The return type for the supportChatAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { supportChat } from './support-chat';
import wav from 'wav';

const SupportChatAudioInputSchema = z.object({
  audio: z.string().describe("A base64 encoded audio file with a data URI."),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe("The history of the conversation so far."),
});
export type SupportChatAudioInput = z.infer<typeof SupportChatAudioInputSchema>;

const SupportChatAudioOutputSchema = z.object({
  textResponse: z.string().describe("The AI's text response to the user's message."),
  audioResponse: z.string().describe("A base64 encoded audio file of the AI's response with a data URI."),
});
export type SupportChatAudioOutput = z.infer<typeof SupportChatAudioOutputSchema>;

export async function supportChatAudio(input: SupportChatAudioInput): Promise<SupportChatAudioOutput> {
  return supportChatAudioFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const supportChatAudioFlow = ai.defineFlow(
  {
    name: 'supportChatAudioFlow',
    inputSchema: SupportChatAudioInputSchema,
    outputSchema: SupportChatAudioOutputSchema,
  },
  async (input) => {
    // 1. Transcribe the user's audio to text
    const { text } = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: [{media: {url: input.audio}}, {text: 'Transcribe this audio.'}]
    });

    // 2. Get a text response from the regular chat flow
    const chatResponse = await supportChat({
        message: text,
        chatHistory: input.chatHistory,
    });

    // 3. Convert the text response to audio (TTS)
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: chatResponse.response,
    });

    if (!media) {
      throw new Error('no media returned from TTS model');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const audioWav = await toWav(audioBuffer);

    return {
      textResponse: chatResponse.response,
      audioResponse: 'data:audio/wav;base64,' + audioWav,
    };
  }
);
