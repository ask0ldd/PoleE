interface ILLMResponse {
    generated_text : ILLMResponse[]
}

interface ILLMResponseItem{
    user : "system" | "user" | "assistant"
    content : string
}

