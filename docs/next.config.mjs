import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const isProd = process.env.NODE_ENV === 'production';
const repoFromEnvironment = process.env.GITHUB_REPOSITORY?.split('/')[1];
const pagesRepoName = process.env.GITHUB_PAGES_REPO || repoFromEnvironment || 'ai-sdlc-kit';
const isUserOrOrgPages = pagesRepoName.endsWith('.github.io');
const basePath = isProd && !isUserOrOrgPages ? `/${pagesRepoName}` : '';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
