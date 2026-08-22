# tarotweb

Website luyện tập xem bài Tarot: chọn kiểu trải bài (1 lá, 3 lá Quá khứ-Hiện tại-Tương lai, hoặc Celtic Cross 10 lá), rút bài, lật từng lá để xem ý nghĩa xuôi/ngược, và lưu lại lịch sử các lượt xem.

## Bắt đầu

Database dùng PostgreSQL hosted trên [Neon](https://neon.tech) (free tier):

1. Tạo tài khoản tại [neon.tech](https://neon.tech), tạo một project mới
2. Trong project, lấy 2 connection string:
   - Connection string **pooled** (hostname có `-pooler`) → dán vào `DATABASE_URL`
   - Connection string **direct** (không pooled) → dán vào `DIRECT_URL`
3. Copy `.env.example` thành `.env` và điền 2 giá trị trên

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
```

Chạy server phát triển:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để sử dụng.

## Deploy lên Vercel

1. Import repo vào Vercel
2. Thêm 2 biến môi trường `DATABASE_URL` và `DIRECT_URL` trong Project Settings → Environment Variables (dùng đúng giá trị Neon ở trên — hoặc dùng tích hợp "Add Neon" trong tab Storage của Vercel để tự sinh 2 biến này)
3. Deploy — build sẽ tự chạy `prisma generate`; nếu có thay đổi schema mới, chạy `npx prisma migrate deploy` để áp dụng migration lên database production

## Cấu trúc

- `lib/tarotDeck.ts` — dữ liệu đầy đủ 78 lá bài (Major + Minor Arcana)
- `lib/spreads.ts` — định nghĩa các kiểu trải bài
- `lib/draw.ts` — logic rút bài ngẫu nhiên
- `app/reading` — trang rút bài và xem kết quả
- `app/history` — trang lịch sử các lượt xem đã lưu (Prisma + PostgreSQL)
