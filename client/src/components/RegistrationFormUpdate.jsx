'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetTrigger,
} from '@/components/ui/sheet';
import { BiEdit } from 'react-icons/bi';
import { useUser } from '@clerk/clerk-react';
import { registerForm } from '../formValue';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';

export default function HotelFormUpdate(hotel) {
	const { user } = useUser();
	const [hotelInfo, setHotelInfo] = useState([]);

	useEffect(() => {
		setHotelInfo(hotel.hotel);
	}, [hotel.hotel]);

	const onHandleChange = (e) => {
		setHotelInfo({ ...hotelInfo, [e.target.id]: e.target.value, userID: user.id });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:5000/posts/registrations/id/${hotel.hotel.id}`, hotelInfo).then((response) => {
				console.log(response.data);
			});
		} catch (err) {
			console.log(err);
		}
		setHotelInfo(registerForm);
		window.location.reload();
	};

	const handleDeleteHotel = async (e) => {
		e.preventDefault();
		try {
			await axios
				.delete(`http://localhost:5000/posts/registrations/id/${hotel.hotel.id}`, hotelInfo)
				.then((response) => {
					console.log(response.data);
				});
			await axios
				.delete(`http://localhost:5000/posts/room/registration/${hotel.hotel.id}`, hotelInfo)
				.then((response) => {
					console.log(response.data);
				});
		} catch (err) {
			console.log(err);
		}
		setHotelInfo(registerForm);
		window.location.reload();
	};

	return (
		<Sheet className='w-full shadow-none border-none h-fit'>
			<SheetTrigger>
				<BiEdit />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Update Hotel</SheetTitle>
					<SheetDescription>Provide the updated information</SheetDescription>
				</SheetHeader>
				<form onSubmit={onSubmit}>
					<div className='flex flex-col w-full h-full items-center gap-4 mt-4'>
						<div className='flex flex-col space-y-1.5 w-full'>
							<Label htmlFor='hotelName'>Hotel Name</Label>
							<Input
								id='hotelName'
								name='hotelName'
								type='text'
								placeholder='Enter hotel name'
								value={hotelInfo.hotelName}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex flex-col space-y-1.5 w-full'>
							<Label htmlFor='contactNumber'>Contact Number</Label>
							<Input
								id='contactNumber'
								name='contactNumber'
								type='number'
								placeholder='Enter contact number'
								value={hotelInfo.contactNumber}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex flex-col space-y-1.5 w-full'>
							<Label htmlFor='street'>Street Address</Label>
							<Input
								id='street'
								name='street'
								type='text'
								placeholder='Enter contact number'
								value={hotelInfo.street}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex gap-4 sm:flex-row flex-col w-full'>
							<div className='flex flex-col space-y-1.5 w-full'>
								<Label htmlFor='city'>City</Label>
								<Input
									id='city'
									name='city'
									onChange={onHandleChange}
									value={hotelInfo.city}
									type='text'
									placeholder='Enter city'
									required
								/>
							</div>
							<div className='flex flex-col space-y-1.5 w-full'>
								<Label htmlFor='province'>Province</Label>
								<Input
									id='province'
									name='province'
									onChange={onHandleChange}
									value={hotelInfo.province}
									type='text'
									placeholder='Enter province'
									required
								/>
							</div>
						</div>
						<div className='flex gap-4 sm:flex-row flex-col w-full'>
							<div className='flex flex-col space-y-1.5 w-full'>
								<Label htmlFor='country'>Country</Label>
								<Input
									id='country'
									name='country'
									onChange={onHandleChange}
									value={hotelInfo.country}
									type='text'
									placeholder='Enter country'
									required
								/>
							</div>
							<div className='flex flex-col space-y-1.5 w-full'>
								<Label htmlFor='zipCode'>Zip Code</Label>
								<Input
									id='zipCode'
									name='zipCode'
									onChange={onHandleChange}
									value={hotelInfo.zipCode}
									type='number'
									placeholder='Enter zip code'
									required
								/>
							</div>
						</div>
					</div>
					<SheetFooter className='flex justify-between m-0 p-0 mt-4'>
						<Button type='button' onClick={handleDeleteHotel} variant='outline'>
							Remove
						</Button>
						<Button type='submit' className='bg-darkColor'>
							Update
						</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}