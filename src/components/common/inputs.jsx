import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Input } from "@/components/ui/input";
import styles from "./common.module.css";
const InputTypePassword = "password";
const InputTypeText = "text";

export const PasswordInput = ({ value, setvalue, placeholder, ...args }) => {
  const [isPassword, setIsPassword] = useState(true);
  return (
    <div className="relative w-full">
      <Input
        className="relative"
        type={isPassword ? "password" : "text"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setvalue(e?.target?.value);
        }}
        {...args}
      />
      <div
        className={styles.password_eye}
        onClick={() => setIsPassword((prev) => !prev)}
      >
        {isPassword ? <IoIosEye /> : <IoIosEyeOff />}
      </div>
    </div>
  );
};
