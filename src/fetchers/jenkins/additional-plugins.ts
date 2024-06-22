import axios from 'axios';
import { jenkinsUrl } from './util';

export interface JenkinsAdditionalPluginsData {
  additionalPlugins: Record<AdditionalPluginId, string>;
}

type AdditionalPluginId = 'extracontexts';

export async function fetchData(): Promise<JenkinsAdditionalPluginsData> {
  return {
    additionalPlugins: {
      extracontexts: await fetchData0('extracontexts'),
    },
  };
}

async function fetchData0(id: string): Promise<string> {
  const url = `${jenkinsUrl}job/${id}/lastSuccessfulBuild/api/json?tree=url,artifacts[fileName,relativePath]`;
  const resp = (await axios.get(url)).data;

  const artifact = resp.artifacts[0];
  return `${resp.url}artifact/${artifact.relativePath}`;
}
