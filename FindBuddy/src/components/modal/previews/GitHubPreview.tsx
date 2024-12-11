import { FC, useEffect, useState } from 'react';

const GitHubPreview: FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Fetch GitHub profile data using GitHub's API
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/users/bsour');
      const data = await response.json();
      setData(data);
    };
    
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-3 bg-white dark:bg-space-black">
      {data && (
        <>
          <div className="flex items-center gap-3">
            <img src={data.avatar_url} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-semibold dark:text-white">{data.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{data.login}</p>
            </div>
          </div>
          <p className="text-sm dark:text-gray-300">{data.bio}</p>
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{data.public_repos} repos</span>
            <span>{data.followers} followers</span>
          </div>
        </>
      )}
    </div>
  );
};

export default GitHubPreview; 