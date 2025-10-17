import type { ReactNode } from "react";
import { ExpandingButton } from "./mainPage/ExpandingButton";
import InputBox from "./InputBox";
import { AnimatePresence, motion } from "framer-motion";

function Guide() {
    return (
        <>
<GuideButton text="Заголовки">
{`# H1 - Найбільший заголовок
## H2 - Великий заголовок
### H3 - Середній заголовок
#### H4 - Малий заголовок
##### H5 - Дуже малий заголовок
###### H6 - Найменший заголовок`}
</GuideButton>

<GuideButton text="Текстове форматування">
{`Це звичайний текст.

**Це жирний текст** або __також жирний__.

*Це курсив* або _також курсив_.

***Це жирний курсив*** або ___також жирний курсив___.

~~Це закреслений текст~~ (потрібен remarkGfm)`}
</GuideButton>

<GuideButton text="Списки">
{`### Маркований список:
- Пункт 1
- Пункт 2
  - Вкладений пункт 1
  - Вкладений пункт 2
    - Глибше вкладений
- Пункт 3

### Нумерований список:
1. Перший пункт
2. Другий пункт
   1. Вкладений нумерований
   2. Ще один вкладений
3. Третій пункт

### Task List (remarkGfm):
- [x] Виконане завдання
- [ ] Невиконане завдання`}
</GuideButton>

<GuideButton text="Посилання">
{`[Це посилання на Google](https://google.com)

[Посилання з title](https://example.com "Наведи мишку!")

<https://automatic-link.com>

https://auto-link-without-brackets.com`}
</GuideButton>

<GuideButton text="Зображення">
{`![Alt текст](https://via.placeholder.com/150)

![Картинка з title](https://via.placeholder.com/200 "Це title")`}
</GuideButton>

<GuideButton text="Код">
{`Це \`інлайн код\`.

\`\`\`
Це блок коду без підсвітки
\`\`\`

\`\`\`javascript
function hello(name) {
  console.log(\`Привіт, \${name}!\`);
}
\`\`\`

\`\`\`python
def greet(name):
    print(f"Привіт, {name}!")
\`\`\`
`}
</GuideButton>

<GuideButton text="Цитати (Blockquotes)">
{`> Це проста цитата.

> Це багаторядкова цитата.
> З кількох рядків.

> Цитата з **жирним** і *курсивом*.

> Вкладена цитата:
> > Це цитата всередині цитати.`}
</GuideButton>

<GuideButton text="Горизонтальні лінії">
{`---
***
___`}
</GuideButton>

<GuideButton text="Таблиці">
{`| Ліва | Центр | Права |
|------|:------:|------:|
| Текст | Центр | Праворуч |
| **Жирний** | *Курсив* | \`Код\` |`}
</GuideButton>

<GuideButton text="Escape-символи">
{`\\* Не буде курсивом \\*

\\# Не буде заголовком

\\[Не буде посиланням\\](url)

\\\`Не буде кодом\\\``}
</GuideButton>

<GuideButton text="Комбінації">
{`**Можна комбінувати: *жирний і курсив разом***

~~**Закреслений і жирний**~~

~~*Закреслений і курсив*~~

[**Жирне посилання**](https://example.com)`}
</GuideButton>

<GuideButton text="HTML у Markdown">
{`<div style="color: red;">
  Це червоний текст через HTML
</div>

<details>
<summary>Клікни, щоб розгорнути</summary>
Прихований контент!
</details>`}
</GuideButton>

<GuideButton text="Footnotes (Примітки)">
{`Ось текст з приміткою[^1].

[^1]: Це текст першої примітки.`}
</GuideButton>

<GuideButton text="Емодзі">
{`:smile: :heart: :rocket: :fire: :+1:

Або вставляй напряму: 😊 ❤️ 🚀 🔥 👍`}
</GuideButton>

<GuideButton text="Переноси рядків">
{`Перший рядок  
Другий рядок

або:

Перший рядок<br>Другий рядок`}
</GuideButton>

<GuideButton text="Код у списку">
{`- Пункт списку
  \`\`\`javascript
  const code = "inside list";
  \`\`\`
- Наступний пункт`}
</GuideButton>
        </>
    )
}

function GuideButton({children, text} : {children : ReactNode, text : string}) {
    return (
        <ExpandingButton text={text} style="institutes" className="text-center text-xs">
            <div className="bg-gray-300 p-3 text-sm text-gray-700 border border-white rounded-md text-left">
                <pre>
                    {children}
                </pre>
            </div>
        </ExpandingButton>
    )
}

export default function MdGuide({ isVisible = true } : { isVisible? : boolean }) {
    return (    
    <AnimatePresence mode="wait">
        {isVisible && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.1 }  }}
                className="grid grid-cols-[2fr_1fr] p-5 gap-5 items-stretch">
                <div className="rounded-sm grid grid-cols-6 gap-4 bg-gray-900/10 p-2 mt-5">
                    <Guide />
                </div>
                <InputBox label="Про MD">
                    <p className="text-gray-300 text-balance mt-2">
                        Синтаксис, що використовується тут для запису всіляких
                        статей, законів тощо - це GitHub-стиль Markdown, що
                        дозволяє швидко додавати різні стилістичні преколи у ваш текст.
                    </p>
                </InputBox>
            </motion.div>
        )}
    </AnimatePresence>
    )
}