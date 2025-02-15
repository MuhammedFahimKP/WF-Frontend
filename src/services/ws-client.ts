const SOCKET_BASE_URL = import.meta.env.VITE_SOCKET_BASE_URL;

const creatSocketClient = (wsUrl: string) =>
  new WebSocket(SOCKET_BASE_URL + wsUrl);

export default creatSocketClient;
