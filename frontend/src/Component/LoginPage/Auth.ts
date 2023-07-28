const REST_API_KEY: any = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI: any = import.meta.env.VITE_REDIRECT_URI;

export const KAKAO_AUTH_URL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,account_email`;
