"use client"

import Image from "next/image";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
// import router from "next/router";
import { redirect, useRouter } from "next/navigation";
import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Link from 'next/link';


let events = [
  {
    id: 1,
    name: 'Pestapora',
    description: 'Pestapora adalah selebrasi terbaru pertunjukan musik Indonesia yang dimeriahkan oleh ratusan artis dan belasan stage',
    organizer: 'Boss Creator',
    city_id: 2,
    is_active: true,
    date_start: "2024-09-20T09:43:19.233Z",
    date_end: "2024-09-27T09:50:45.438Z",
    createdAt: "2024-10-10T09:43:19.233Z",
    image_url: "",
    updatedAt: null,
    deletedAt: null,
  },
]

type Events = {
  id: number;
  name: string;
  description: string;
  organizer: string;
  city_id: number;
  is_active: true,
  date_start: string;
  date_end: string;
  image_url: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export default function Home() {
  const router = useRouter();
  const ikigaiUrl = "http://localhost:8080"
  const [keyword, setKeyword] = useState("");
  const [ eventList, setEventsLit ]  = useState([])

  const logoutAccount = () => {
    router.push('/')
  }

  const getEventData =  async () => {
    let urlEvent = ikigaiUrl + "/event/all"
    let data = {}
    let jwtToken = localStorage.getItem("token")
    if (jwtToken) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ jwtToken
      }
      axios.post(
        urlEvent,
        data, 
        {
          headers: headers
        })
        .then((data) => {
          console.log("data: ", data);
          setEventsLit(data.data.result)
        })
        .catch((err) => {
          console.log("err: ", err);
        })
    } else {
      logoutAccount()
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    }
  }


  useEffect(() => {
    getEventData()
  }, [])
  
  return (
    <div>
      <Navbar/>
      <div className="p-4 md:p-10 mx-auto max-w-7xl">
        <Grid numItemsSm={4} numItemsLg={4} className="gap-6">
          {
              eventList !== null && eventList !== undefined && eventList.length > 1
                ? 
                eventList.map((item: Events, i: number) => {
                  return (
                    <Card key={item.id} className='border-solid border-2 border-sky-500 rounded-md'>
                      <Link
                        // href={"/meal/"+ item.idMeal}
                        href={"/home"}
                        // onClick={() => {}}
                      >
                        <Title className='font-bold text-lg text-center'>{item.name}</Title>
                      </Link>
                      <Flex className='mt-6'>
                        <Link
                          // href={"/meal/"+ item.idMeal}
                          href={"/home"}
                        >
                          <div
                            // ref={"/meal/" + item.idMeal}
                            className="col items-center justify-center"
                            >
                            <Image
                              // className="rounded-full"
                            className="col items-center justify-center"
                              src={item.image_url.toString()}
                              height={800}
                              width={800}
                              alt={""}
                            />
                          </div>
                        </Link>
                      </Flex>
                        <Flex className="mt-6">
                          <div className='col items-center'>
                            <Text className="text-center">Location: {item.city_id}</Text>
                            <Text className="text-center">Description: {item.description}</Text>
                            {/* <Text className="text-left mt-6 w-200px">{item.strInstructions}</Text> */}
                            {/* <Text className="text-left mt-6">Category: {item.strCategory}</Text>
                            <Text className="text-left mt-2">Tags: {item.strTags}</Text>
                          <Text className="text-left mt-2">Link Youtube:
                            <a className='italic text-cyan-600' href={item.strYoutube}> here</a>
                          </Text> */}
                          </div>
                        </Flex>
                    </Card>
                
              )
                })
                : 
                <div></div>
          }
          </Grid>
      </div>
    </div>
  );
}