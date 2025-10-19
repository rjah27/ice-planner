import { html, fixture, expect } from '@open-wc/testing';
import "../ice-planner.js";

describe("IcePlanner test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ice-planner
        title="title"
      ></ice-planner>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
