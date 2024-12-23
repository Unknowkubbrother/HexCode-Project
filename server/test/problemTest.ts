import { describe, expect, test } from "bun:test";
const { API_END_POINT } = process.env;

export default function runTest() {
  describe("Problems System", () => {
    test("Create Problem And Add Test case", async () => {
      const i = 1;
        const title = `Problem ${i}`;
        const description = `This is problem ${i}`;
        const difficulty = ( i % 3 ) + 1; 
        const type = [(i % 4) + 1, (i % 3) + 1];
        const filedocs = `test/assets/problemOne/avg_shortest.pdf`;
        const hint = ["hint one", "hint two"];

        const problemResult = await createProblem(
          title,
          description,
          difficulty,
          type,
          filedocs,
          hint
        );

        const problemId = problemResult.result._id;
        const id = 1;
        const input = `test/assets/problemOne/1.in`;
        const output = `test/assets/problemOne/1.sol`;
        const point = 100 + i;

        await addTestCase(
          problemId,
          id,
          input,
          output,
          point
        );
    });


    test("Add Test Case", async () => {
        const problemId = "67699db8310785f35d1329ab";
        const id = 2
        const input = "test/assets/problemOne/1.in";
        const output = "test/assets/problemOne/1.sol";
        const point = 50;

        const result = await addTestCase(
          problemId,
          id,
          input,
          output,
          point
        );

        console.log(result);
    });
  });
}

async function createProblem(
  title: string,
  description: string,
  difficulty: number,
  type: number[],
  filedocs?: string,
  hint?: string[]
) { 
  try {
    const body = new FormData();
    body.append("title", title);
    body.append("description", description);
    body.append("difficulty", difficulty.toString());
    body.append("type", JSON.stringify(type));

    if (filedocs) {
      const BufferFileDocs = await Bun.file(filedocs).arrayBuffer();
      const fileNameFileDocs = filedocs.split("/")[3];
      body.append("filedocs", new File([BufferFileDocs], fileNameFileDocs));
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
    point: number
) {
    const inputFile = await Bun.file(input).arrayBuffer();
    const outputFile = await Bun.file(output).arrayBuffer();

    const body = new FormData();
    body.append("problemId", problemId);
    body.append("id", id.toString());
    body.append("input", new File([inputFile], `${id}.in`));
    body.append('output', new File([outputFile], `${id}.sol`));
    body.append('point', point.toString());

    const response = await fetch(`${API_END_POINT}/problem/add-test-case`,
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

