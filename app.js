const jsonInput = document.getElementById("json-input");
const jsonOutput = document.getElementById("json-output");
const convertBtn = document.getElementById("convert-btn");

function createJsonSchema(jsonData) {
  let schema = {
    type: "object",
    properties: {},
  };

  for (let key in jsonData) {
    if (Array.isArray(jsonData[key])) {
      if (jsonData[key].length > 0 && typeof jsonData[key][0] === "object") {
        schema.properties[key] = {
          type: "array",
          items: {
            type: "object",
            properties: createJsonSchema(jsonData[key][0]).properties,
          },
        };
      } else {
        schema.properties[key] = {
          type: "array",
          items: {
            type: typeof jsonData[key][0],
          },
        };
      }
    } else if (typeof jsonData[key] === "object") {
      if (jsonData[key] === null) {
        schema.properties[key] = {
          type: "null",
        };
      } else {
        schema.properties[key] = {
          type: "object",
          properties: createJsonSchema(jsonData[key]).properties,
        };
      }
    } else {
      schema.properties[key] = {
        type: typeof jsonData[key],
      };
    }
  }

  return schema;
}

convertBtn.addEventListener("click", () => {
  try {
    const jsonData = JSON.parse(jsonInput.value);
    const schema = createJsonSchema(jsonData);
    jsonOutput.innerHTML = JSON.stringify(schema, null, 2);
  } catch (error) {
    jsonOutput.innerHTML = error.message;
  }
});

function copyToClipboard() {
  var jsonOutput = document.getElementById("json-output");
  var range = document.createRange();
  range.selectNode(jsonOutput);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  alert("Metin panoya kopyalandı!");
}
