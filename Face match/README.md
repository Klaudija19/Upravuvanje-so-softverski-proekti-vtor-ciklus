# Face Match Memory Game

Веб-игра од типот "Memory Match" изработена во React со PHP/MySQL backend. Корисниците играат игра на меморија каде треба да спојат парови карти, со три нивоа на тежина (easy, medium, hard).

## Функционалности

- ✅ Регистрација и најава на корисници
- ✅ Три нивоа на тежина (Easy, Medium, Hard)
- ✅ Тајмер и бројач на обиди
- ✅ Автоматска логика за проверка на исправност на избраните парови
- ✅ Кориснички профил со индивидуален прогрес
- ✅ Историја на одиграни партии (ниво, време, број обиди, постигнат резултат)
- ✅ Лидерборд со најдобри играчи

## Технологии

**Frontend:**
- React 19
- React Router DOM
- Axios
- Vite

**Backend:**
- PHP 7.4+
- MySQL
- PDO

## Поставување на Backend

1. Отвори го XAMPP и стартувај го Apache и MySQL
2. Отвори phpMyAdmin (http://localhost/phpmyadmin)
3. Импортирај го `schema.sql` фајлот од `C:\xampp\htdocs\face-match-backend\schema.sql`
   - Или копирај го SQL кодот и изврши го во phpMyAdmin
4. Провери дали базата на податоци `face_match_db` е креирана со табели `users` и `games`

## Поставување на Frontend

1. Отвори терминал во frontend директориумот
2. Инсталирај ги зависностите:
```bash
npm install
```

3. Стартувај го development server:
```bash
npm run dev
```

4. Отвори го браузерот на `http://localhost:5173` (или портата што Vite ќе ја прикаже)

## Структура на проектот

```
face-match/
├── src/
│   ├── pages/          # Страници (Home, Login, Register, Game, Profile, History, Leaderboard)
│   ├── components/     # Компоненти (Card, Navbar)
│   ├── utils/          # Утилити (gameConfig)
│   ├── api.js          # API конфигурација
│   └── App.jsx         # Главна компонента
└── public/             # Статички фајлови

face-match-backend/
├── db.php              # Database connection
├── login.php           # Login endpoint
├── register.php        # Register endpoint
├── save_game.php       # Save game result endpoint
├── profile.php         # Get user profile stats
├── history.php         # Get user game history
├── leaderboard.php     # Get leaderboard
└── schema.sql          # Database schema
```

## API Endpoints

- `POST /login.php` - Најава на корисник
- `POST /register.php` - Регистрација на нов корисник
- `POST /save_game.php` - Зачувување на резултат од игра
- `POST /profile.php` - Добивање на статистики за корисникот
- `POST /history.php` - Добивање на историја на игри
- `GET /leaderboard.php` - Добивање на лидерборд

## Конфигурација

Увери се дека `src/api.js` има правилен `baseURL`:
```javascript
baseURL: "http://localhost/face-match-backend"
```

Ако го користиш различен порт или име на директориум, промени го соодветно.

## Играње

1. Регистрирај се или најави се
2. Избери ниво на тежина (Easy, Medium, Hard)
3. Кликни на карти за да ги отвориш и најди ги паровите
4. Погледни го твојот резултат и статистики во Profile
5. Провери ја историјата на игри и лидербордот

## Нивоа на тежина

- **Easy**: 2 пара карти (2x2 grid)
- **Medium**: 4 пара карти (4x2 grid)
- **Hard**: 6 пара карти (4x3 grid)

## Пресметка на резултат

Резултатот се пресметува со формулата:
```
score = max(1000 - (time * 10) - (attempts * 5), 0)
```

## Развој

За production build:
```bash
npm run build
```

За preview на production build:
```bash
npm run preview
```
