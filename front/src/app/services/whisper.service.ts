import { Injectable } from '@angular/core';
import { AutomaticSpeechRecognitionOutput, AutomaticSpeechRecognitionPipeline, pipeline } from '@huggingface/transformers';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhisperService {
  transcriber : AutomaticSpeechRecognitionPipeline | null = null

  constructor() { }

  async init(){
    if(this.transcriber != null) return
    // @ts-ignore
    this.transcriber = await pipeline(
      "automatic-speech-recognition",
      "onnx-community/whisper-tiny.en",
      { 
        device: "webgpu",
        dtype : 'fp32',
      },
    )
  }

  async transcribe() : Promise<AutomaticSpeechRecognitionOutput | AutomaticSpeechRecognitionOutput[] | null>{
    try{
      await this.init()
      if(!this.transcriber) throw new Error("TTS generator hasn't been initilized.")
      const url = "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav"
      // const url = "http://localhost:3000/static/video.wav"
      return await this.transcriber(url, {
        chunk_length_s: 30,
        stride_length_s: 10,
      });
    }catch(error : unknown){
      console.error(error)
      return null
    }
  }

  generate$(): Observable<AutomaticSpeechRecognitionOutput | AutomaticSpeechRecognitionOutput[] | null> {
    return from(this.transcribe())
  }
  
}
