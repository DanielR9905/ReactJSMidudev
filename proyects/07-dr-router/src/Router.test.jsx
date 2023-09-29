import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Router } from "./Router";

describe("Router", () => {
  beforeEach(() => {
    cleanup()
  })
  
  it("should render without problems"),
    () => {
      render(<Router routes={[]}/>)
      expect(true).toBeTruthy()
    };


    it("should render 404 if no routes match"),
    () => {
      render(<Router routes={[]} defaultComponent={()=> <h1>404</h1>}/>)
      console.log(screen.debug())
    };
});
