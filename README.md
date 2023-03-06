# Schema Generator

<img width="749" alt="Screenshot 2023-03-06 at 14 55 32" src="https://user-images.githubusercontent.com/56169582/223103766-f9651e79-1569-4cd5-8294-ed44316a029a.png">

Schema Generator, JSON verilerinden JSON şemaları oluşturmanızı sağlayan bir UI aracıdır. Bu araç sayesinde, JSON verilerinizi doğru bir şekilde doğrulayacak olan JSON şemalarını hızlı bir şekilde oluşturabilirsiniz.

## Amaç
E2e test aracı olan Cypress kullanımında API testleri yapabiliyoruz. API testlerinde response'ların type kontrolu için popüler olan **chai-json-schema-ajv** eklentisi kullanıyoruz. Schema Generator ile response json'u schema'ya dönüştüren bir araç olması amaçlanmıştır. 

## Kullanım
Schema Generator'ü kullanmak oldukça basittir. Sadece aşağıdaki adımları izlemeniz yeterli:

* Schema Generator websitesi adresine gidin.
* JSON verinizi yükleyin.
* Convert butonuna tıklayarak, JSON verinizden bir şema oluşturun.
* Oluşturulan şemayı, Copy to clipboard butonu ile kopyalayın.


## Şemayı Cypress Testlerinde Kullanımı
Schema Generator ile oluşturduğunuz şemayı, Cypress testleri için kullanabilirsiniz. 
Örneğin, **chai-json-schema-ajv** eklentisini kullanarak, aşağıdaki şekilde bir kontrol yapabilirsiniz:

```js
// Şema oluşturma
const fruitSchema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "color": {"type": "string"},
        "price": {"type": "number"}
    },
    "required": ["name", "color", "price"]
}

// Test kontrolü
cy.request('/fruits')
    .its('body')
    .each((fruit) => {
        expect(fruit).to.be.jsonSchema(fruitSchema);
    });

```
Daha detaylı açıklamalar ve kurulum için [buradaki](https://furkans-organization-1.gitbook.io/cypress-notlari/17.-api-response-data-type-kontrolu) dokümantasyonu inceleyebilirsiniz.

Ayrıca Cypress ile ilgili  hazırladığım el kitapcığına [buradan](https://furkans-organization-1.gitbook.io) göz atabilirsin


