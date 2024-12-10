import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(config);

async function generateImagePrompt(name: string) {
    try {
        const response = await openAI.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an creative and helpfull AI assistant capable of generatin interesting thumbnail descriptions for my notes. Your output will fed to DALLE API to generate a thumbnail. The description should be minimalistic and flat styled. Only thumbnail descriptions without any info.",
                },
                {
                    role: "user",
                    content: `Please generate a thumbnail description for my notebook with title "${name}"`,
                },
            ],
        });
        const data = await response.json();   
        console.log('----------------------------------------------------------------');
        
        console.log(data);
        
        console.log(process.env.OPENAI_API_KEY);
        
        
        const imageDescription = data.choices[0].message.content;
        return imageDescription;
    } catch (error) {
        console.log(error);
        throw new Error(
            `Error: Failed to generate thumbnail description. (More: ${error})`
        );
    }
}

async function generateImage() {
    ("");
}


export {
    generateImagePrompt,
    generateImage
}