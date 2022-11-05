import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';

import Spinner from './Spinner';
import Switcher from './Switcher';

const Feed = () => {
  const [loading, setloading] = useState(true);
  const { categoryId } = useParams();
  const [pins, setPins] = useState();

  useEffect(() => {
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setloading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setloading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner massage='We are adding new ideas to your feed!' />;

  if (!pins?.length) return <h2>No pins avaliable</h2>;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
