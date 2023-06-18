type BreadCrumbProps = {
  url: string;
};
export default function BreadCrumb({ url }: BreadCrumbProps) {
  const crumbs = url.replace("-", " ").split("/");
  crumbs.shift();

  return (
    <div className="text-sm md:text-lg breadcrumbs">
      <ul>
        {crumbs.map((crumb) => {
          return (
            <li key={crumb}>
              <a className="capitalize">{crumb}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
