import { describe, expect, test } from "bun:test";
const API_END_POINT = "http://localhost:4000";

export default function runTest() {
    describe("Challenge System", () => {
        test("Create Challengs", async () => {

            const title = "Challenge 1";
            const description = "This is challenge 1";
            const thumbnail = "https://wallpapershome.com/images/pages/ico_h/27093.jpg";
            const images = ["https://wallpapershome.com/images/pages/ico_h/27093.jpg", "https://media.discordapp.net/attachments/1266697909429338208/1341784049168945202/freepik__expand__33474.png?ex=67b74146&is=67b5efc6&hm=17f53670491cb916fb4e291b954e75838df8db013131a371bccd6625d07c7f7c&=&format=webp&quality=lossless&width=550&height=311"];
            const problem = ["67ac9ee19f9d74872a80119b"]
            const viewer = "private";
            const startTime = Date.now();
            const endTime = Date.now() + 1000000000;
            const reward = [1000,500,200];

            const challengeResult = await createChallenge(
                title,
                description,
                thumbnail,
                images,
                problem,
                viewer,
                startTime,
                endTime,
                reward
            );
           
            console.log(challengeResult);
        });
    });
}

async function createChallenge(
    title: string,
    description: string,
    thumbnail: string,
    images: string[],
    problem: string[],
    viewer: string,
    startTime: number,
    endTime: number,
    reward?: Number[]
) {
    try {
        const body = {
            title,
            description,
            thumbnail,
            images,
            problem,
            viewer,
            startTime,
            endTime,
            reward,
        };

        const response = await fetch(`${API_END_POINT}/challenge/create`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);

        if (!response.ok) {
            return response.statusText;
        }

        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }
}