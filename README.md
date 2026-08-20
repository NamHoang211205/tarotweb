# tarotweb

Website luyện tập xem bài Tarot: chọn kiểu trải bài (1 lá, 3 lá Quá khứ-Hiện tại-Tương lai, hoặc Celtic Cross 10 lá), rút bài, lật từng lá để xem ý nghĩa xuôi/ngược, và lưu lại lịch sử các lượt xem.

## Bắt đầu

Cài dependencies và khởi tạo database (SQLite, chỉ cần làm 1 lần):

```bash
npm install
npx prisma migrate dev
```

Chạy server phát triển:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để sử dụng.

## Cấu trúc

- `lib/tarotDeck.ts` — dữ liệu đầy đủ 78 lá bài (Major + Minor Arcana)
- `lib/spreads.ts` — định nghĩa các kiểu trải bài
- `lib/draw.ts` — logic rút bài ngẫu nhiên
- `app/reading` — trang rút bài và xem kết quả
- `app/history` — trang lịch sử các lượt xem đã lưu (Prisma + SQLite, file `prisma/dev.db`)

Đây là công cụ tự luyện tập cá nhân, chạy local. Nếu muốn deploy công khai (Vercel...), cần đổi sang database hosted (Postgres/Turso...) vì SQLite dạng file không tồn tại được trên môi trường serverless.
