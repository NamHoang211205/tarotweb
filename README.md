# tarotweb

Website luyện tập xem bài Tarot: đăng nhập/đăng ký, chọn kiểu trải bài (1 lá, 3 lá Quá khứ-Hiện tại-Tương lai, hoặc Celtic Cross 10 lá), rút bài, lật từng lá để xem ý nghĩa xuôi/ngược, trò chuyện với AI để luận giải sâu hơn, và lưu lại lịch sử các lượt xem của riêng mình.

## Bắt đầu

Database dùng PostgreSQL hosted trên [Neon](https://neon.tech) (free tier):

1. Tạo tài khoản tại [neon.tech](https://neon.tech), tạo một project mới
2. Trong project, lấy 2 connection string:
   - Connection string **pooled** (hostname có `-pooler`) → dán vào `DATABASE_URL`
   - Connection string **direct** (không pooled) → dán vào `DIRECT_URL`
3. Tạo một API key tại [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) → dán vào `ANTHROPIC_API_KEY` (dùng cho tính năng AI luận giải)
4. Copy `.env.example` thành `.env` và điền các giá trị trên (kèm `AUTH_SECRET` — có thể tự sinh bằng lệnh ghi chú sẵn trong file)

```bash
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
```

Chạy server phát triển:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để sử dụng.

## Deploy lên Vercel

1. Import repo vào Vercel
2. Thêm các biến môi trường `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `ANTHROPIC_API_KEY` trong Project Settings → Environment Variables (hoặc dùng tích hợp "Add Neon" trong tab Storage của Vercel để tự sinh 2 biến Neon)
3. Deploy — build sẽ tự chạy `prisma generate`; nếu có thay đổi schema mới, chạy `npx prisma migrate deploy` rồi `npx prisma db seed` để áp dụng lên database production

## Cấu trúc

- `lib/cards.ts` — đọc dữ liệu 78 lá bài (Major + Minor Arcana) từ bảng `Card` trong Postgres; `prisma/seedData.ts` + `prisma/seed.ts` chỉ dùng để seed dữ liệu ban đầu, không phải nguồn dữ liệu lúc chạy
- `lib/spreads.ts` — định nghĩa các kiểu trải bài
- `lib/draw.ts` — logic rút bài ngẫu nhiên (nhận deck đã fetch làm tham số)
- `auth.ts` / `auth.config.ts` — cấu hình Auth.js (Credentials + bcrypt); `proxy.ts` bảo vệ route `/history`
- `app/reading` — chọn kiểu trải bài; `app/reading/[spread]` — rút bài, xem kết quả, trò chuyện với AI
- `app/api/chat` — route streaming gọi Claude API để luận giải, luôn bám sát ý nghĩa lá bài đã có trong DB
- `app/history` — lịch sử các lượt xem đã lưu của riêng người dùng đang đăng nhập, kèm hội thoại AI đã lưu
