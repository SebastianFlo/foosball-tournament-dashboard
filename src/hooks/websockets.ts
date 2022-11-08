import { ref } from "vue";

const ws = ref<WebSocket | null>(null);

const generateWS = (url: URL, cb: any) => {
  const ws = new WebSocket(url);

  if (!ws) {
    throw new Error("server didn't accept ws");
  }

  ws.addEventListener("open", () => {
    console.log("Opened websocket");
  });

  ws.addEventListener("message", cb);
  // ws.addEventListener("message", () => {
  //   console.log("Message cb");
  // });

  ws.addEventListener("close", () => {
    ws.close();
  });

  return ws;
};

export function useWS(cb: any) {
  const url = new URL("ws://foosball-dash.sefhold.workers.dev/wc");
  ws.value = ws.value || generateWS(url, cb);

  return {
    ws,
  };
}
