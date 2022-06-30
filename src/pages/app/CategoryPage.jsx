import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationCrosshairs,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

// import AppMap from '../../components/shared/AppMap';
import MapLeaflet from '../../components/shared/MapLeaflet';

import {
  GridCol3,
  GridCol2,
  GridItemSpan2,
  GridItemSpan1,
} from '../../components/shared/GridCol';

import LoadIconBtn from '../../components/shared/LoadIconBtn';

import './_categoryPage.css';
import getGeoLoc from '../../utils/getGeoLoc';
import Pagination from '../../components/shared/Pagination';

function CategoryPage(props) {
  const { category } = useParams();

  const [loading] = useState(false);
  const [error] = useState(false);
  const [data] = useState(true);

  const [geoLoc, setGeoLoc] = useState({
    isLoading: false,
    coords: null,
  });

  useEffect(() => {
    console.log('make the query');
  }, [category]);

  const onClickHandler = () => {
    setGeoLoc(geoLoc => ({ ...geoLoc, isLoading: true }));
    getGeoLoc()
      .then(res => {
        return setGeoLoc(geoLoc => ({
          ...geoLoc,
          isLoading: false,
          coords: res,
        }));
      })
      .catch(err => {
        alert(err.message);
        return setGeoLoc(geoLoc => ({ ...geoLoc, isLoading: false }));
      });
  };

  useEffect(() => {
    console.log(geoLoc);
  }, [geoLoc]);

  return (
    <>
      <div className='category'>
        <h1 className='category__title'>Title: Activités sportives</h1>
        <p className='category__subtitle'>
          Subtitle: Se depenser en s’amuser, rien de mieux pour lier le plaisir
          et la santé en famille{' '}
        </p>
      </div>

      {loading && <div>LOADING</div>}
      {error && <div>ERROR</div>}
      {data && (
        <GridCol3 className='bg-red-500 relative)'>
          <GridCol2 className='col-span-2'>
            <GridItemSpan2>
              <div className='filter__group'>
                <button className='filter__container' onClick={onClickHandler}>
                  {geoLoc.isLoading ? (
                    <LoadIconBtn />
                  ) : (
                    <FontAwesomeIcon icon={faLocationCrosshairs} />
                  )}
                  <div className='filter__text'>Activités autour de moi</div>
                </button>
                <div className='filter__container'>
                  <FontAwesomeIcon icon={faFilter} />
                  <div className='filter__text'>Critères de recherche</div>
                </div>
              </div>
            </GridItemSpan2>

            <GridItemSpan1>
              <div className='h-64'>EVENT CARD COMPONENT</div>
            </GridItemSpan1>
            <GridItemSpan1>
              <div className='h-64'>EVENT CARD COMPONENT</div>
            </GridItemSpan1>
            <GridItemSpan1>
              <div className='h-64'>EVENT CARD COMPONENT</div>
            </GridItemSpan1>
            <GridItemSpan1>
              <div className='h-64'>EVENT CARD COMPONENT</div>
            </GridItemSpan1>
            <GridItemSpan1>
              <div className='h-64'>EVENT CARD COMPONENT</div>
            </GridItemSpan1>
            <GridItemSpan1>
              <div className='h-64'>EVENT CARD COMPONENT</div>
            </GridItemSpan1>
            <GridItemSpan1>
              <div className='h-64'>EVENT CARD COMPONENT</div>
            </GridItemSpan1>

            <GridItemSpan2>
              <Pagination />
            </GridItemSpan2>
          </GridCol2>
          <div className='sticky top-0 right-0 bg-yellow-300 h-64 w-92'>
            <MapLeaflet />
          </div>
        </GridCol3>
      )}
    </>
  );
}

export default CategoryPage;