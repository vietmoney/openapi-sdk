# Giới thiệu chung

## Về VietMoney OpenAPI

> VietMoney OpenAPI 1.0

```
__     ___      _   __  __
 \ \   / (_) ___| |_|  \/  | ___  _ __   ___ _   _
  \ \ / /| |/ _ \ __| |\/| |/ _ \| '_ \ / _ \ | | |
   \ V / | |  __/ |_| |  | | (_) | | | |  __/ |_| |
    \_/  |_|\___|\__|_|  |_|\___/|_| |_|\___|\__, |
                                             |___/
```

**VietMoney OpenAPI (1.0)** là cổng mở cho các đơn vị ví điện tử, ngân hàng, thu hộ cho phép đối tác sử dụng API để giúp khách hàng tra cứu/ thanh toán/ gia hạn khoản vay của VietMoney tại ứng dụng của đối tác.
Ngoài ra VMOA cũng phù hợp cho các đơn vị bên thứ 3 tiếp thị liên kết(affiliate marketing)

## Thuật ngữ

### Tên sản phẩm

VietMoney OpenAPI 1.0 = VMOA

### Tài khoản doanh nghiệp

Mỗi đối tác khi liên kết với VietMoney sẽ sử dụng tài khoản doanh nghiệp (`ESA`).
Tài khoản này sẽ dùng để quản lý các giao dịch, thông tin tích hợp, lưu lượng truy cập v.v..

### Mã giao dịch VietMoney

Mã giao dịch VietMoney (`txID`) là một mã được VietMoney tạo ra để định danh cho một giao dịch của đối tác. `txID` này là duy nhất trên hệ thống VietMoney.

### Mã giao dịch đối tác

Mã giao dịch đối tác (`refId`/`orderId`) là mã **duy nhất** và **định danh** cho giao dịch của đối tác khi gửi qua VietMoney để yêu cầu gạch nợ. Một `txID` sẽ ứng với một `refId`.

### Mã lead đối tác

Mã lead đối tác (`leadId`) là mã **duy nhất** và **định danh** cho lead của đối tác khi gửi qua VietMoney để yêu cầu xử lý thông tin.

## Quy trình tích hợp

Các bước cơ bản để tích hợp với VietMoney:

- Liên hệ và Đăng ký [tài khoản doanh nghiệp](emailto:dathq@vietmoney.vn).

> Bạn cần hoàn thành quá trình đăng ký với đầy đủ thông tin, trạng thái mặc định của doanh nghiệp sẽ là `chưa xác thực`.
> [Thông tin tích hợp](home?id=th%c3%b4ng-tin-t%c3%adch-h%e1%bb%a3p) mặc định sẽ môi trường `Sandbox`

- Đơn vị tiến hành kiểm thử phần mềm, tham khảo các **testcase** của VietMoney cung cấp để kiểm tra các lỗi phổ biến trong quá trình thanh toán.
- Sau khi đơn vị kinh doanh hoàn thành tích hợp và kiểm thử, VietMoney sẽ xác thực dịch vụ của bạn trên môi trường sandbox trước khi lên production.
- Sau khi được xác nhận, tài khoản doanh nghiệp của bạn sẽ được chuyển sang trạng thái `đã xác thực`.
- Thay đổi các thông tin tích hợp theo môi trường `production`.
- Triển khai dịch vụ thanh toán cho khách hàng.

> Tham khảo tài nguyên: [Logo, Brand name, CSS, ...](docs/resource)

## Thông tin tích hợp

VietMoney cung cấp cho đơn vị kinh doanh hai môi trường để tích hợp với `VietMoney API`:

- **Sandbox**: Sử dụng trong quá trình tích hợp: xây dựng tính năng, kiểm thử, debug, v.v..
- **Production**: Sử dụng để triển khai cho khách hàng thanh toán dịch vụ.

### Key Credential

Thông tin cấu hình để kết nối với **VietMoney API**.

- **Client ID**: Thông tin để định danh tài khoản doanh nghiệp.
- **Client Secret**: Cấp quyền truy cập vào hệ thống VietMoney.
- **Secret Key**: Dùng để tạo chữ ký điện tử `signature` bằng thuật toán HMAC.
- **Public Key**: Sử dụng để tạo mã hoá dữ liệu bằng thuật toán RSA.

> Vì đây là thông tin sẽ thay đổi theo từng môi trường. Bạn nên để chúng trong cấu hình môi trường của ứng dụng. [Chi tiết](https://12factor.net/config)

[Tìm kiếm thông tin key của bạn](https://developer.vietmoney.vn/portal)

### Cấu hình HTTP Request

| Key          | Value                                                                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type | `application/json; charset=UTF-8`                                                                                                                                          |
| Method       | `POST`                                                                                                                                                                     |
| Domain       | Production: [https://partner.vietmoney.vn](https://partner.vietmoney.vn/api)</br>Sandbox: [https://sandbox-partner.vietmoney.vn](https://sandbox-partner.vietmoney.vn/api) |

## Security

**VietMoney** sử dụng [chữ ký điện tử](https://en.wikipedia.org/wiki/Digital_signature) và [mã hoá dữ liệu](https://en.wikipedia.org/wiki/Encryption) để xác thực dữ liệu đầu vào và ra trên mỗi yêu cầu **HTTP Request**/**HTTP Response**.

> Thư viện thuật toán Hmac_SHA, RSA ở [đây](https://github.com/vietmoney/payment)

### Chữ ký điện tử

`signature` là một chuỗi ký tự được tạo ra từ một thuật toán cho trước, sử dụng để **kiểm tra tính đúng đắn của dữ liệu** trên đường truyền giữa 2 hệ thống. Một số thuật toán đang sử dụng là MD5, SHA1, SHA256 và Hmac.

Tham khảo thêm: [Wikipedia](https://en.wikipedia.org/wiki/HMAC)

Trong tài liệu này **VietMoney** sử dụng thuật toán **RSA256** để tạo `signature`.
Dữ liệu đầu vào bao gồm [Secret Key](home?id=key-credential) và `data`, `data` được tạo ra theo định dạng: `key1=value1&key2=value2...`

> key1: tên field, value1 = giá trị của key1.

Thông tin về các cặp `key=value` xem chi tiết hơn trong từng bảng mô tả **HTTP Request**/**HTTP Response**

#### Ví dụ

Request mẫu

```json
{
  "clientSecret": "2rFzwj5Xdsg4KncGbfcOfmjCMTRkrrP0",
  "clientId": "ViettelPay",
  "orderId": "MM1540456472575",
  "query": "CKH382671222",
  "orderInfo": "TRA CUU KHOAN VAY TAI KHOAN",
  "metadata": {
    "paidPhoneNo": "09333937372"
  },
  "signature": "996ed81d68a1b05c99516835e404b2d0146d9b12fbcecbf80c7e51df51cac85e"
}
```

Cách tạo chữ ký điện tử:

```http query
partnerCode=$partnerCode&apiKey=$apiKey&query=$query&orderInfo=$orderInfo&extraData=JSON.stringify($extraData)&clientId=$clientSecret&clientId=$clientId
```

==> Dữ liệu được tạo ra:

```http query
partnerCode=ViettelPay&apiKey=2rFzwj5Xdsg4KncGbfcOfmjCMTRkrrP0&query=CKH382671222&orderInfo=$orderInfo&extraData=JSON.stringify($extraData)
```

=> Chữ ký được tạo ra:

Secret Key: `K951B6PE1waDMi640xX08PD3vg6EkVlz`

```javascript
var signature = HmacSHA256(data, secretkey);
console.log(signature);

996ed81d68a1b05c99516835e404b2d0146d9b12fbcecbf80c7e51df51cac85e
```

!> **Lưu ý**: Đây chỉ là ví dụ mẫu cho cách tạo chữ ký, bạn phải thay thế dữ liệu của chính bạn để tạo chữ ký chính xác.

<a href="/tryitnow/#integrate_key" class="try-your__self"> Try it now</a>

### Mã hóa RSA

[Mã hóa RSA](<https://vi.wikipedia.org/wiki/RSA_(m%C3%A3_h%C3%B3a)>) là một thuật toán **mã hóa khóa công khai** để **bảo vệ thông tin** trên đường truyền. Sử dụng một cặp key (`public key` và `private key`) để mã hóa và giải mã dữ liệu. Đối tác dùng [public key](home?id=key-credential) do VietMoney cung cấp để mã hóa data theo định dạng của VietMoney, VietMoney sẽ giải mã bằng **private key**.

Thuật toán RSA được VietMoney sử dụng theo chuẩn: [PKCS #8](https://en.wikipedia.org/wiki/PKCS_8)

#### Ví dụ

> Dữ liệu trước khi RSA

```json
{
  "partnerCode": "VietMoneyIQA420180417",
  "partnerRefId": "Merchant123556666",
  "partnerTransId": "8374736463",
  "amount": 40000,
  "description": "Thanh toan VietMoney"
}
```

> Dữ liệu sau khi mã hóa RSA

```
A7WFmmnpn6TRX42Akh/iC5DdU5hhBT9LR5QSG6rJAl70hfEkkGUx2pTCai8s+M9KMVUcJ7m52iv74yhmeEjjN10TtEJoqITBIYBG2bqcTprhDijyhV4ePU7ytDNuLxzzIvGfTYyvbsEJ2jZTSf556yod12vhYqOJSFL/U2hVuxjUahf5Rnu5R/OLalg8QmlU6nQooEuNdzEXPMd6j9EaxOCiB2oM5/9QiTN0tCNSTIVvPtnlHu5mIbBHChcwfToIL4IAiD1nbrlDuBX//CZcrZj6hFqjvU31yb/DuG02c3aqWxbZKZ8csOwF9bL30m/yGr/0BQUWgunpDPrmCosf9A==
```

<a href="/tryitnow/#integrate_key" class="try-your__self"> Try it now</a>

# Đơn hàng

## Tạo đơn hàng

Đối tác có thể tạo đơn hàng yêu cầu cầm cố hoặc khoản vay.

### HTTP Request

> POST /api/sales/v1/orders

| Tên field   | Kiểu          | Bắt buộc | Mô tả                                                                                         | Giá trị mặc định |
| ----------- | ------------- | -------- | --------------------------------------------------------------------------------------------- | ---------------- |
| fullName    | String        | √        | Họ và tên khách hàng                                                                          |                  |
| phoneNumber | String        | √        | Số điện thoại khách hàng                                                                      |                  |
| demandLoan  | String        | √        | Số tiền khách hàng cần vay. Đối tác nên gửi chuỗi số                                          |                  |
| description | String        | √        | Mô tả tình trạng, loại tài sản cầm cố                                                         |                  |
| images      | Array[String] | √        | Danh sách đường link hình ảnh, kiểu dữ liệu là mảng của chuỗi link                            |                  |
| metadata      | Object[Metadata] |         | Thông tin metadata của đơn hàng                           |                  | NULL
| txnId       | String        | √        | Transaction ID của đối tác sinh ra. Mã này bắt buộc phải là duy nhất tại hệ thống của đối tác |                  |

Metadata Object

| Tên field   | Kiểu          | Bắt buộc | Mô tả                                                                                         | Giá trị mặc định |
| ----------- | ------------- | -------- | --------------------------------------------------------------------------------------------- | ---------------- |
| location    | String        |         | Thông số geolocation của người dùng, Theo định dạng `longtitude,latitude`                                                                         |                  |
| userAgent | String        | √       | Thông số user agent của người dùng                                                                      |                  |
| ip  | String        |         | Địa chỉ IP của khách hàng                                          |                  |

#### Sample Request

```json
curl --location --request POST 'https://sandbox-partner.vietmoney.vn/api/sales/v1/orders' \
--header 'Content-Type: application/json' \
--header 'apiKey: XXXXXX' \
--data-raw '{
    "fullName": "Nguyễn Xuân Đạt",
    "phoneNumber": "0472692671",
    "demandLoan": "30000000",
    "description": "Xe Honda Airblade 2019 BSTP, mới 99%",
    "images": [
        "https://danhgiaxe.net/wp-content/uploads/2018/08/Honda-Airblade-2019-3.jpg"
    ],
    "metadata": {
        "location": "10.7653943,106.659986",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
        "ip": "100.02.0.20"
    },
    "txnId": "693b604e-e58e-421e-8e13-99cdad19807a"
}'
```

### HTTP Response

| Tên field   | Kiểu          | Bắt buộc | Mô tả                                                                                         | Giá trị mặc định |
| ----------- | ------------- | -------- | --------------------------------------------------------------------------------------------- | ---------------- |
| id    | String        | √        | Mã đơn hàng được sinh ra từ VietMoney                                                                          |                  |
| fullName    | String        | √        | Họ và tên khách hàng                                                                          |                  |
| phoneNumber | String        | √        | Số điện thoại khách hàng                                                                      |                  |
| demandLoan  | String        | √        | Số tiền khách hàng cần vay. Đối tác nên gửi chuỗi số                                          |                  |
| description | String        | √        | Mô tả tình trạng, loại tài sản cầm cố                                                         |                  |
| images      | Array[String] | √        | Danh sách đường link hình ảnh, kiểu dữ liệu là mảng của chuỗi link                            |                  |
| metadata      | Object[Metadata] |         | Thông tin metadata của đơn hàng                           |                  | NULL
| txnId       | String        | √        | Transaction ID của đối tác sinh ra. Mã này bắt buộc phải là duy nhất tại hệ thống của đối tác |                  |
| sourceId       | String        | √        | Mã này được VietMoney định danh đối tác (ESA) |                  |
| hash       | String        | √        | Mã này được VietMoney sinh ra để tránh việc có nhiều đơn hàng vào cùng 1 thời điểm bị trùng nhau |                  |

Metadata Object

| Tên field   | Kiểu          | Bắt buộc | Mô tả                                                                                         | Giá trị mặc định |
| ----------- | ------------- | -------- | --------------------------------------------------------------------------------------------- | ---------------- |
| location    | String        |         | Thông số geolocation của người dùng, Theo định dạng `longtitude,latitude`                                                                         |                  |
| userAgent | String        | √       | Thông số user agent của người dùng                                                                      |                  |
| ip  | String        |         | Địa chỉ IP của khách hàng                                          |                  |


#### Sample response

```json
{
    "id": "5e5a4c123083133d5f6a46bc",
    "fullName": "Nguyễn Xuân Đạt",
    "phoneNumber": "0472692671",
    "demandLoan": "30000000",
    "description": "Xe Honda Airblade 2019 BSTP, mới 99%",
    "images": [
        "https://danhgiaxe.net/wp-content/uploads/2018/08/Honda-Airblade-2019-3.jpg"
    ],
    "metadata": {
        "location": "10.7653943,106.659986",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
        "ip": "100.02.0.20"
    },
    "sourceId": "YOUR_IDENTITY_SOURCE",
    "createdAt": "2020-02-29T11:33:38.212Z",
    "updatedAt": "2020-02-29T11:33:38.212Z",
    "hash": "69b1d1dd80310cfd54e297f8162f472e"
}
```
