import Image from "next/image";
import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/user.png"
          alt="Nilesh"
          height={300}
          width={300}
        />
      </div>
      <h1>Hello, I'm Nilesh</h1>
      <p>
        I blog about web development - especially frontend framework like React.
      </p>
    </section>
  );
};

export default Hero;
