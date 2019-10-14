import React from "react"
import Enzyme, { shallow } from "enzyme"
import EnzymeAdapter from "enzyme-adapter-react-16"

import Tips from "../tips"

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe("Tips", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Tips />)
    const tipsComponent = wrapper.find("[data-test='tips-app']")
    expect(tipsComponent.length).toBe(1)
  })
})
