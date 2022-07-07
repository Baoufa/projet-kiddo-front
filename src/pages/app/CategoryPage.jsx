import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faFilter } from '@fortawesome/free-solid-svg-icons';

// import custom components
import { GET_EVENTS_CATEGORY } from '../../graphql/query/events.query';
import { GET_CATEGORY_BY_NAME } from '../../graphql/query/extra.query';
import MapLeaflet, { MapLeafletPlaceHolder } from '../../components/shared/MapLeaflet';
import { GridCol2, GridItemSpan2 } from '../../components/shared/GridCol';
import LoadIconBtn from '../../components/shared/loadingfiles/LoadIconBtn';
import ActivityCard from '../../components/shared/card/ActivityCard';
import getGeoLoc from '../../utils/getGeoLoc';
import PaginationComp from '../../components/shared/PaginationComp';
import Skelet from '../../components/shared/loadingfiles/Skelet';
import Filterbox from '../../components/shared/filterbox/Filterbox';

//import CSS
import './categoryPage.css';

function CategoryPage(props) {
  const ITEMS_PER_PAGE = 12;

  let navigate = useNavigate();
  const { category } = useParams();

  const [isFilterShown, setIsFilterShown] = useState(false);

  const [maxDistMeters, setMaxDistMeters] = useState(200000);
  const [minChildAge, setMinChildAge] = useState(0);
  const [maxChildAge, setMaxChildAge] = useState(12);

  const [page, setPage] = useState(1);
  const [geoLoc, setGeoLoc] = useState({
    isLoading: false,
    coords: null,
  });

  // Queries
  const {
    // loading: loading2,
    // error: error2,
    data: data2,
  } = useQuery(GET_CATEGORY_BY_NAME, { variables: { name: category } });
  const [getEvents, { loading, error, data, refetch }] = useLazyQuery(GET_EVENTS_CATEGORY);

  useEffect(() => {
    if (data2?.category === null) {
      navigate('/404');
    }

    if (data2?.category && !data) {
      getEvents({
        variables: {
          input: {
            first: ITEMS_PER_PAGE,
            offset: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
            categories: data2.category._id,
            status: 'PUBLISHED',
            minDate: Date.now(),
            dateOrder: 'asc',
            minChildAge: minChildAge,
            maxChildAge: maxChildAge,
          },
        },
      });
    }

    if (data && !geoLoc?.coords) {
      refetch({
        input: {
          first: ITEMS_PER_PAGE,
          offset: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
          categories: data2.category._id,
          status: 'PUBLISHED',
          minDate: Date.now(),
          dateOrder: 'asc',
          minChildAge: minChildAge,
          maxChildAge: maxChildAge,
        },
      });
    }

    if (geoLoc.coords?.length > 1) {
      refetch({
        input: {
          first: ITEMS_PER_PAGE,
          offset: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
          categories: data2.category._id,
          status: 'PUBLISHED',
          minDate: Date.now(),
          dateOrder: 'asc',
          minChildAge: minChildAge,
          maxChildAge: maxChildAge,
          lng: geoLoc.coords[0],
          lat: geoLoc.coords[1],
          maxDistMeters: maxDistMeters,
        },
      });
    }
  }, [data2, getEvents, page, data, refetch, navigate, geoLoc.coords, minChildAge, maxChildAge, maxDistMeters]);

  const toggleFilterBox = () => {
    setIsFilterShown((bol) => !bol);
  };

  const onClickHandler = () => {
    setGeoLoc((geoLoc) => ({ ...geoLoc, isLoading: true }));
    getGeoLoc()
      .then((res) => {
        setMaxDistMeters(200000);
        return setGeoLoc((geoLoc) => ({
          ...geoLoc,
          isLoading: false,
          coords: res,
        }));
      })
      .catch((err) => {
        alert(err.message);
        return setGeoLoc((geoLoc) => ({ ...geoLoc, isLoading: false }));
      });
  };

  return (
    <div className='container mx-auto'>
      <div className='category'>
        <h1 className='category__title'>Title: Activités sportives</h1>
        <p className='category__subtitle'>Subtitle: Se depenser en s’amuser, rien de mieux pour lier le plaisir et la santé en famille </p>
      </div>

      {loading && (
        <div className='relative flex gap-8'>
          <GridCol2 className='grow'>
            <GridItemSpan2>
              <div className='filter__group'>
                <button className='filter__container' onClick={onClickHandler} disabled>
                  <LoadIconBtn />
                  <div className='filter__text'>Activités autour de moi</div>
                </button>
                <button className='filter__container' disabled>
                  <FontAwesomeIcon icon={faFilter} />
                  <div className='filter__text'>Critères de recherche</div>
                </button>
              </div>
            </GridItemSpan2>
            <Skelet />
            <Skelet />
            <Skelet />
            <Skelet />
            <Skelet />
            <Skelet />
            <Skelet />
            <Skelet />
          </GridCol2>
          <MapLeafletPlaceHolder className='bg-yellow-300 rounded-xl' />
        </div>
      )}

      {error && <div>ERROR</div>}
      {data?.eventsComplexQuery.results.length === 0 && (
        <div className='relative flex gap-8'>
          <GridCol2 className='grow'>
            <GridItemSpan2>
              <div className='filter__group'>
                <button className='filter__container' onClick={onClickHandler}>
                  {geoLoc.isLoading ? <LoadIconBtn /> : <FontAwesomeIcon icon={faLocationCrosshairs} />}
                  <div className='filter__text'>Activités autour de moi</div>
                </button>
                <div className='filter__container'>
                  <button className='flex items-center gap-5 justify-start' onClick={toggleFilterBox}>
                    <FontAwesomeIcon icon={faFilter} />
                    <div className='filter__text'>Critères de recherche</div>
                  </button>

                  <Filterbox
                    className={isFilterShown ? '' : 'filterbox__hidden'}
                    maxDist={maxDistMeters}
                    setMaxDist={setMaxDistMeters}
                    minChildAge={minChildAge}
                    setMinChildAge={setMinChildAge}
                    maxChildAge={maxChildAge}
                    setMaxChildAge={setMaxChildAge}
                  />
                </div>
              </div>
              <div>Pas de résutats</div>
            </GridItemSpan2>

            <Skelet />
            <Skelet />
            <Skelet />
            <Skelet />
          </GridCol2>
          <MapLeafletPlaceHolder className='bg-yellow-300 rounded-xl' />
        </div>
      )}
      {data?.eventsComplexQuery.results.length > 0 && (
        <div className='relative flex gap-8'>
          <GridCol2 className='grow'>
            <GridItemSpan2>
              <div className='filter__group'>
                <button className='filter__container' onClick={onClickHandler}>
                  {geoLoc.isLoading ? <LoadIconBtn /> : <FontAwesomeIcon icon={faLocationCrosshairs} />}
                  <div className='filter__text'>Activités autour de moi</div>
                </button>
                <div className='filter__container'>
                  <button className='flex items-center gap-5 justify-start' onClick={toggleFilterBox}>
                    <FontAwesomeIcon icon={faFilter} />
                    <div className='filter__text'>Critères de recherche</div>
                  </button>

                  <Filterbox
                    className={isFilterShown ? '' : 'filterbox__hidden'}
                    maxDist={maxDistMeters}
                    setMaxDist={setMaxDistMeters}
                    minChildAge={minChildAge}
                    setMinChildAge={setMinChildAge}
                    maxChildAge={maxChildAge}
                    setMaxChildAge={setMaxChildAge}
                  />
                </div>
              </div>
            </GridItemSpan2>

            {data.eventsComplexQuery.results.map((data, index) => {
              return (
                <Link key={data._id} to={`/event/${data._id}`}>
                  <ActivityCard
                    title={data.content.title}
                    category={data2.category.name}
                    location={data.adress.city}
                    date={data.event_date.start}
                    price={data.event.price}
                  />
                </Link>
              );
            })}

            <GridItemSpan2>
              <PaginationComp
                totalItem={data.eventsComplexQuery.count}
                itemsPerPage={12}
                page={page}
                onPageClick={(page) => {
                  setPage(page);
                }}
              />
            </GridItemSpan2>
          </GridCol2>

          <MapLeaflet className='rounded-xl' currentLocation={geoLoc?.coords} items={data.eventsComplexQuery.results} maxDistMeters={maxDistMeters} />
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
