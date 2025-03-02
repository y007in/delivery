import { useRef, useState } from 'react';
import FormControl from '../../../../components/FormControl/FormControl';
import AccordionList from '../../../../components/AccordionList/AccordionList';
import Button from '../../../../components/Button/Button';
import { paymentMethod } from '../../../../constants/paymentMethod';
import { useNavigate } from 'react-router-dom';
import { format } from 'prettier';

const OrderForm = ({ onSubmit }) => {
  const [checked, setChecked] = useState(paymentMethod[0]);
  const userNameRef = useRef(null);
  const userTelRef = useRef(null);
  const userCreditRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      name: userNameRef.current.value,
      tel: userTelRef.current.value,
      payment: checked,
    };
    onSubmit(formData);
  };
  return (
    <form className="forms" id="order-form" onSubmit={handleSubmit}>
      <AccordionList title={'개인정보'} boolean={true}>
        <FormControl label={'이름'} htmlFor={'userName'} required>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="이름"
            ref={userNameRef}
            autoFocus
            required
          />
        </FormControl>
        <FormControl label={'전화번호'} htmlFor={'userTel'} required>
          <input
            type="text"
            id="userTel"
            name="userTel"
            placeholder="01000000000"
            pattern="^\d{2,3}\d{3,4}\d{4}$"
            ref={userTelRef}
            required
          />
        </FormControl>
      </AccordionList>
      <AccordionList title={'결제수단'} boolean={true}>
        <section className="paymentMethod">
          {paymentMethod.map(method => (
            <FormControl
              key={method}
              label={method}
              htmlFor={method}
              sr_only={'sr-only'}
            >
              <Button
                styleType={checked === method ? 'brand' : 'brandSolid'}
                onClick={e => {
                  e.preventDefault();
                  setChecked(method);
                }}
                text={method}
              />
              <input
                type="radio"
                name="paymentMethod"
                id={method}
                value={method}
                checked={checked === method}
                onChange={() => setChecked(method)}
                ref={userCreditRef}
              />
            </FormControl>
          ))}
        </section>
      </AccordionList>
    </form>
  );
};

export default OrderForm;
