const ConfigureStore = require("./ConfigureStore")
// @ponicode
describe("ConfigureStore.ConfigureStore", () => {
    test("0", () => {
        let callFunction = () => {
            ConfigureStore.ConfigureStore()
        }
    
        expect(callFunction).not.toThrow()
    })
})
