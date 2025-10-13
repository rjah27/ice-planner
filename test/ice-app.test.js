import { html, fixture, expect } from '@open-wc/testing';
import "../ice-app.js";

describe("IceApp test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ice-app
        title="title"
      ></ice-app>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
