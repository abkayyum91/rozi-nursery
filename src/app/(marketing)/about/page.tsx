

const AboutPage= () => {
    return (
      <div className="container py-10 flex flex-col lg:flex-row items-start gap-8">
        {/* about */}
        <div className="basis-1/2 lg:basis-[60%] p-4">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam temporibus quam voluptatum atque et earum, nihil iusto nam officiis ipsum molestias impedit, laudantium illo possimus. Blanditiis quasi sed, harum nobis sint excepturi rerum aspernatur incidunt inventore aliquid. Culpa molestiae tenetur, delectus magni tempore voluptates, deserunt animi blanditiis omnis fugiat debitis. Pariatur accusantium, ab possimus, iure officia, doloremque suscipit consectetur minima hic omnis fuga. Tenetur?</p>
        </div>
        {/* shop details */}
        <div className="basis-1/2 lg:basis-[40%] p-4">
          <h1 className="text-lg capitalize font-semibold tracking-wider divide-y-2">Shop Address</h1>
          <p className="text-foreground/80 py-2">
            Old Cinema, Sector 15 Noida <br />Uttar Pradesh <br />Mob: 98******87 / 87******67
          </p>
          <h1 className="text-lg font-semibold pt-5 pb-2">Location</h1>
          <div className="">map......</div>
        </div>
      </div>
    );
  };
  
  export default AboutPage;
  