import { describe, expect, test } from "bun:test";
const API_END_POINT = "http://localhost:4000";

export default function runTest() {
    describe("Challenge System", () => {
        test("Create Challengs", async () => {

            
           
        });
    });
}

async function createChallenge(
    title: string,
    description: string,
    thumbnail: string,
    images: string[],
    problem: object[],
    viewer: string,
    startTime: number,
    endTime: number,
    secret_code?: string,
    reward?: string[]
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
            secret_code,
            reward,
        };

        const response = await fetch(`${API_END_POINT}/challenge/create`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return response.statusText;
        }

        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }
}