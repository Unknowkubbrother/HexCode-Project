import { describe, expect, test } from "bun:test";
const { API_END_POINT } = process.env;

export default function runTest() {
  describe("Problems System", () => {
    // test("Create Problem 1", async () => {
    //    const title = "Problem One";
    //     const description = "This is problem one";
    //     const difficulty = 1;
    //     const type = [1, 2];
    //     const filedocs = "test/assets/problemOne/avg_shortest.pdf";
    //     const hint = ["hint one", "hint two"];

    //     const result = await createProblem(
    //       title,
    //       description,
    //       difficulty,
    //       type,
    //       filedocs,
    //       hint
    //     );

    //     console.log(result);
    // });


    test("Add Test Case", async () => {
        const problemId = "67697c39883b45d5fd37b51a";
        const id = 1;
        const input = "test/assets/problemOne/1.in";
        const output = "test/assets/problemOne/1.sol";
        const point = 100;

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

