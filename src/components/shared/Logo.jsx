import { Fragment } from "react";

export default function Logo({ titleProp, className }) {
  return (
    <div className="md:mr-10 md:-ml-14">
      <a href="/" className="">
        <span className="sr-only">Workflow</span>
        <Fragment key={titleProp.title}>
          <titleProp.img className={className} />
        </Fragment>
      </a>
    </div>
  );
}
