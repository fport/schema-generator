const jsonInput = document.getElementById("json-input");
const jsonOutput = document.getElementById("json-output");
const convertBtn = document.getElementById("convert-btn");

function convertJsonToSchema() {
  const jsonData = JSON.parse(jsonInput.value);
  const schema = {
    type: typeof jsonData,
    properties: {},
  };

  if (Array.isArray(jsonData)) {
    schema.type = "array";
    schema.items = convertJsonToSchema(jsonData[0]);
  } else if (typeof jsonData === "object") {
    for (const key in jsonData) {
      schema.properties[key] = convertJsonToSchema(jsonData[key]);
    }
  }

  return schema;
}

function createJsonSchema(jsonData) {
  let schema = {
    type: "object",
    properties: {},
  };

  for (let key in jsonData) {
    if (Array.isArray(jsonData[key])) {
      schema.properties[key] = {
        type: "array",
        items: {
          type: "object",
          properties: createJsonSchema(jsonData[key][0]).properties,
        },
      };

      // Özel durum: Dizinin elemanları string ise "items" şemasını güncelle
      if (jsonData[key].length > 0 && typeof jsonData[key][0] === "string") {
        schema.properties[key].items = {
          type: "string",
        };
      }
    } else if (typeof jsonData[key] === "object") {
      // Özel durum: null değeri için şema güncellemesi
      if (jsonData[key] === null) {
        schema.properties[key] = {
          type: "object",
          properties: createJsonSchema(jsonData[key]).properties,
        };
      }

      if (jsonData[key] === null) {
        schema.properties[key] = {
          type: "null",
        };
      }
    } else {
      schema.properties[key] = {
        type: typeof jsonData[key],
      };

      // Özel durum: null değeri için şema güncellemesi
      if (jsonData[key] === null) {
        schema.properties[key].type = "null";
      }
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
