import { IJobsAPIAccessTokenResponse } from "../interfaces/jobsAPI/responses/IJobsAPIAccessTokenResponse";

export function isJobsAPIAccessTokenResponse(response: unknown): response is IJobsAPIAccessTokenResponse {
    return (
        typeof response === 'object' &&
        response !== null &&
        'access_token' in response &&
        'expires_in' in response &&
        'scope' in response &&
        'token_type' in response &&
        typeof response.access_token === 'string' &&
        typeof response.expires_in === 'number' &&
        typeof response.scope === 'string' &&
        response.token_type === 'Bearer'
    );
}