<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\DataFixtures\AppFixtures;
use App\Entity\Tour;

class TourFixtures extends AppFixtures
{
	public function loadData(ObjectManager $manager)
	{
		$this->createMany(Tour::class, 5, function(Tour $tour) {
			$tour->setName($this->faker->sentence(5));
	        $tour->setDuration($this->faker->randomNumber(1));
	        $tour->setMaxGroupSize($this->faker->randomNumber(2));

	        $difficulty = ["easy", "medium", "difficult"];
	        $random = array_rand($difficulty);
	        $value = $difficulty[$random];

	        $tour->setDifficulty($value);
	        $tour->setRatings($this->faker->randomNumber(2));
	        $tour->setPrice($this->faker->randomNumber(1));
	        $tour->setSummary($this->faker->text);
	        $tour->setDescription($this->faker->paragraph);
	        $tour->setImageCover($this->faker->image('public/uploads/tours', 400, 300, null, false));
	        $tour->setLocation($this->faker->city.', '.$this->faker->country);
	        $tour->setLatitude($this->faker->latitude($min = -90, $max = 90));
	        $tour->setLongitude($this->faker->longitude($min = -180, $max = 180));
	        $tour->setStartDate($this->faker->dateTime);
		});

		$manager->flush();
	}
}
