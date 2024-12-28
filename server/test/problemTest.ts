import { describe, expect, test } from "bun:test";
const API_END_POINT = "http://localhost:4000";

export default function runTest() {
  describe("Problems System", () => {
    test("Create Problem And Add Test case", async () => {
      const i = 1;
        const title = `Problem ${i}`;
        const description = `This is problem ${i}`;
        const difficulty = ( i % 3 ) + 1; 
        const type = [(i % 4) + 1, (i % 3) + 1];
        const docs = `test/assets/problemOne/avg_shortest.pdf`;
        const hint = ["hint one", "hint two"];

        const problemResult = await createProblem(
          title,
          description,
          difficulty,
          type,
          docs,
          hint
        );

        const problemId = problemResult.result._id;
        const id = 1;
        const input = `test/assets/problemOne/1.in`;
        const output = `test/assets/problemOne/1.sol`;
        const points = 100 + i;

       const resultTestcase =  await addTestCase(
          problemId,
          id,
          input,
          output,
          points
        );

        console.log(resultTestcase);

    });
  });
}

async function createProblem(
  title: string,
  description: string,
  difficulty: number,
  type: number[],
  docs?: string,
  hint?: string[]
) { 
  try {
    const body = new FormData();
    body.append("title", title);
    body.append("description", description);
    body.append("difficulty", difficulty.toString());
    body.append("type", JSON.stringify(type));

    if (docs) {
      const BufferFileDocs = await Bun.file(docs).arrayBuffer();
      const fileNameFileDocs = docs.split("/")[3];
      body.append("docs", new File([BufferFileDocs], fileNameFileDocs));
    }

    if (hint) {
      body.append("hint", JSON.stringify(hint));
    }

    const response = await fetch(`${API_END_POINT}/problem/create`, {
        method: "POST",
        body,
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

async function addTestCase(
    problemId: string,
    id: number,
    input: string,
    output: string,
    points: number
) {
    const inputFile = await Bun.file(input).arrayBuffer();
    const outputFile = await Bun.file(output).arrayBuffer();

    const body = new FormData();
    body.append("problemId", problemId);
    body.append("id", id.toString());
    body.append("input", new File([inputFile], `${id}.in`));
    body.append('output', new File([outputFile], `${id}.sol`));
    body.append('points', points.toString());

    const response = await fetch(`${API_END_POINT}/testcase/add`,
        {
            method: 'POST',
            body,
        },
    );

    if (!response.ok) {
        return response.statusText;
    }

    const json = await response.json();
    return json;
}

