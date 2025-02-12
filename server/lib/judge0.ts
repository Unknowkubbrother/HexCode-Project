const judge0_api_url = process.env.JUDGE0_API_URL;
const token : string = process.env.JUDGE0_X_AUTH_TOKEN || 'hexcode';

export const getLanguages = async (): Promise<
    { id: number; name: string }[]
> => {
    const response = await fetch(`${judge0_api_url}/languages`, {
        headers: new Headers({
            'X-Auth-Token': token,
        }),
    });
    return response.json();
};

export const createSubmission = async (body: {
    source_code: string;
    language_id: number;
    cpu_time_limit?: number; // In seconds
    memory_limit?: number; // In MiB = > 1024 * KiB
    stack_limit?: number; // In MiB  = > 1024 * KiB
    max_file_size?: number; // In MiB  = > 1024 * KiB
    stdin?: string;
}): Promise<{ token: string }> => {
    const formattedBody = {
        source_code: body.source_code,
        language_id: body.language_id,
        ...(body.cpu_time_limit && {
            cpu_time_limit: body.cpu_time_limit,
        }),
        ...(body.memory_limit && {
            memory_limit: body.memory_limit * 1024,
        }),
        ...(body.stack_limit && {
            stack_limit: body.stack_limit * 1024,
        }),
        ...(body.max_file_size && {
            max_file_size: body.max_file_size * 1024,
        }),
        ...(body.stdin && {
            stdin: body.stdin,
        }),
    };

    const response = await fetch(`${judge0_api_url}/submissions`, {
        method: 'POST',
        headers: new Headers({
            'X-Auth-Token': token,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(formattedBody),
    });

    return response.json();
};

export const getSubmission = async (
    submissionToken: string,
): Promise<{
    stdout: string | null;
    time: string | null;
    memory: number | null;
    stderr: string | null;
    token: string;
    compile_output: string | null;
    message: string | null;
    status: {
        id: number;
        description:
            | 'Processing'
            | 'In Queue'
            | 'Accepted'
            | 'Compilation Error'
            | 'Runtime Error (NZEC)'
            | 'Time Limit Exceeded';
    };
}> => {
    const response = await fetch(
        `${judge0_api_url}/submissions/${submissionToken}?base64_encoded=true`,
        {
            method: 'GET',
            headers: new Headers({
                'X-Auth-Token': token,
                'Content-Type': 'application/json',
            }),
        },
    );

    return response.json();
};

export const convertStatusToType = (
    status:
        | 'Processing'
        | 'In Queue'
        | 'Accepted'
        | 'Compilation Error'
        | 'Runtime Error (NZEC)'
        | 'Time Limit Exceeded',
) => {
    if (status === 'Processing') return 'processing';
    if (status === 'In Queue') return 'in_queue';
    if (status === 'Accepted') return 'accepted';
    if (status === 'Compilation Error') return 'compilation_error';
    if (status === 'Runtime Error (NZEC)') return 'runtime_error';
    if (status === 'Time Limit Exceeded') return 'time_limit';

    return 'other';
}