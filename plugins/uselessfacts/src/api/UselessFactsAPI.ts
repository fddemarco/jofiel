import { ConfigApi, createApiRef, DiscoveryApi, FetchApi } from "@backstage/core-plugin-api";
import { UselessFact } from "../types";

const DEFAULT_PROXY_PATH = '/uselessfacts/api';

export type Options = {
    discoveryApi: DiscoveryApi;
    fetchApi: FetchApi;
    configApi: ConfigApi;
}

export interface UselessFactApi {
    getUselessFact(uselessfact_type: string): Promise<UselessFact>;
}

export const UselessFactApiRef = createApiRef<UselessFactApi>({
    id: 'plugin.useless-facts-api.service',
});

export class UselessFactsApiClient implements UselessFactApi {
    private readonly discoveryApi: DiscoveryApi;
    private readonly configApi: ConfigApi;
    private readonly fetchApi: FetchApi;

    constructor(options: Options) {
        this.discoveryApi = options.discoveryApi;
        this.configApi = options.configApi;
        this.fetchApi = options.fetchApi;
    }

    private async getBaseUrl() {
        const proxyPath = this.configApi.getOptionalString('uselessfacts.proxyPath') || DEFAULT_PROXY_PATH;
        return `${await this.discoveryApi.getBaseUrl('proxy')}${proxyPath}`;
    }

    private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
        const proxyUrl = await this.getBaseUrl();
        const resp = await this.fetchApi.fetch(`${proxyUrl}${input}`, init);
        if (!resp.ok) throw new Error(resp.statusText);
        return await resp.json();
    }

    async getUselessFact(uselessfact_type: string): Promise<UselessFact> {
        if (uselessfact_type === "Random")
            return await this.fetch<UselessFact>('/api/v2/facts/random');
        return await this.fetch<UselessFact>('/api/v2/facts/today');
    }
}