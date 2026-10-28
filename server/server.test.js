const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("./server");

test("GET /api/health returns a successful health response", async () => {
  const server = app.listen(0);
  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.status, "ok");
    assert.equal(data.message, "Tic Tac Toe API is running");
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => error ? reject(error) : resolve())
    );
  }
});
