# 全感覚旅行記 台湾編

2026年4月12日（日）・13日（月）に岐阜県郡上市八幡町で開催した展示「全感覚旅行記 台湾編」の特設サイトです。
九日間の台湾滞在で書いた文章七篇を壁に貼り、二日間だけ人が集まる場所をつくりました。

**公開URL** https://zenkankakutaiwan.vercel.app/

## ページ構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | 開催概要。ステートメント、展示の趣旨、開催情報、出展者（台椀） |
| `report.html` | 当日の記録。開場前から二日間の様子まで |
| `texts.html` | 展示した文章。七篇の全文 |

## つくり

ライブラリもビルドも使わない、HTML・CSS・JavaScriptだけの静的サイトです。

- CSSはカスタムプロパティと `clamp()` で、文字サイズと余白を画面幅に追従させています
- 日本語の折り返しは `word-break: auto-phrase` と `line-break: strict` で文節単位に。`lang="ja"` が効く範囲でのみ働きます
- ヒーローの縦組みタイトルは `writing-mode: vertical-rl` と `text-orientation: upright`
- 並べた写真は `aspect-ratio` で高さをそろえ、`object-fit: cover` で中央トリミング
- JavaScriptは `IntersectionObserver` によるスクロール表示のみ。それ以外は使っていません
- 文字色と背景色の全組み合わせがWCAG 2.1 AA（4.5:1）を満たしています

## クレジット

- 企画・文章・サイト制作：宮本雅就
- 写真：提供（掲載許可済み）
- 出展：台椀（郡上八幡）／豆花・台湾茶

この催しは終了しています。
