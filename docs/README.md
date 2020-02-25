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

VietMoney OpenAPI 1.0 =  VMOA

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

- **Partner Code**: Thông tin để định danh tài khoản doanh nghiệp.
- **API Key**: Cấp quyền truy cập vào hệ thống VietMoney.
- **Secret Key**: Dùng để tạo chữ ký điện tử `signature`.
- **Public Key**: Sử dụng để tạo mã hoá dữ liệu bằng thuật toán RSA.

> Vì đây là thông tin sẽ thay đổi theo từng môi trường. Bạn nên để chúng trong cấu hình môi trường của ứng dụng. [Chi tiết](https://12factor.net/config)

[Tìm kiếm thông tin key của bạn](https://developer.vietmoney.vn/portal)

### Cấu hình HTTP Request

| Key | Value |
| --- | ----- |
|Content-Type|`application/json; charset=UTF-8`|
|Method		 |`POST`|
|Domain		 | Production: [https://partner.vietmoney.vn](https://partner.vietmoney.vn)</br>Sandbox: [https://sandbox-partner.vietmoney.vn](https://sandbox-partner.vietmoney.vn)|


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
  "apiKey": "2rFzwj5Xdsg4KncGbfcOfmjCMTRkrrP0",
  "partnerCode": "ViettelPay",
  "orderId": "MM1540456472575",
  "query": "CKH382671222",
  "orderInfo": "TRA CUU KHOAN VAY TAI KHOAN",
  "metadata": {
    "paidPhoneNo": "09333937372",
  },
  "signature": "996ed81d68a1b05c99516835e404b2d0146d9b12fbcecbf80c7e51df51cac85e"
}
```

Cách tạo chữ ký điện tử:

```http query
partnerCode=$partnerCode&apiKey=$apiKey&query=$query&orderInfo=$orderInfo&extraData=JSON.stringify($extraData)
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
[Mã hóa RSA](https://vi.wikipedia.org/wiki/RSA_(m%C3%A3_h%C3%B3a)) là một thuật toán **mã hóa khóa công khai** để **bảo vệ thông tin** trên đường truyền. Sử dụng một cặp key (`public key` và `private key`) để mã hóa và giải mã dữ liệu. Đối tác dùng [public key](home?id=key-credential) do VietMoney cung cấp để mã hóa data theo định dạng của VietMoney, VietMoney sẽ giải mã bằng **private key**.

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
