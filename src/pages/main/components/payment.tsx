export const Payment = () => {
    const TPF = document.getElementById("payform-tinkoff");

    // @ts-ignore
    TPF.addEventListener("submit", function (e) {
        e.preventDefault();
        // @ts-ignore
        const {description, amount, email, phone, receipt} = TPF;

        if (receipt) {
            if (!email.value && !phone.value)
                return alert("Поле E-mail или Phone не должно быть пустым");

            // @ts-ignore
            TPF.receipt.value = JSON.stringify({
                "EmailCompany": "mail@mail.com",
                "Taxation": "patent",
                "FfdVersion": "1.2",
                "Items": [
                    {
                        "Name": description.value || "Оплата",
                        "Price": amount.value + '00',
                        "Quantity": 1.00,
                        "Amount": amount.value + '00',
                        "PaymentMethod": "full_prepayment",
                        "PaymentObject": "service",
                        "Tax": "none",
                        "MeasurementUnit": "pc"
                    }
                ]
            });
        }

    })

    return (
        <form className="payform-tinkoff" name="payform-tinkoff">
            <input className="payform-tinkoff-row" type="hidden" name="terminalkey" value="TinkoffBankTest"/>
            <input className="payform-tinkoff-row" type="hidden" name="frame" value="false"/>
            <input className="payform-tinkoff-row" type="hidden" name="language" value="ru"/>
            <input className="payform-tinkoff-row" type="text" placeholder="Сумма заказа" name="amount"
                   required/>
            <input className="payform-tinkoff-row" type="hidden" placeholder="Номер заказа" name="order"/>
            <input className="payform-tinkoff-row" type="text" placeholder="Описание заказа"
                   name="description"/>
            <input className="payform-tinkoff-row" type="text" placeholder="ФИО плательщика"
                   name="name"/>
            <input className="payform-tinkoff-row" type="email" placeholder="E-mail"
                   name="email"/>
            <input className="payform-tinkoff-row" type="tel"
                   placeholder="Контактный телефон" name="phone"/>
            <input className="payform-tinkoff-row payform-tinkoff-btn" type="submit"
                   value="Оплатить"/>
        </form>
    )
}