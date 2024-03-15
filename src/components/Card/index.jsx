const Card = ({ title, children }) => {
  return (
    <section className="flex flex-col flex-wrap gap-y-2 p-4 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl text-title font-semibold border-b border-gray-300">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Card;
