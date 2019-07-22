<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\DataFixtures\AppFixtures;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends AppFixtures
{
	private $encoder;

	public function __construct(UserPasswordEncoderInterface $encoder)
	{
		$this->encoder = $encoder;
	}

	public function loadData(ObjectManager $manager)
	{
		$this->createMany(User::class, 1, function(User $user) {
			$user->setFirstName($this->faker->firstName);
			$user->setLastName($this->faker->lastName);
			$user->setEmail($this->faker->email);
			$user->setRoles(array('ROLE_USER'));
			$encoder = $this->encoder->encodePassword($user, 'test');
			$user->setPassword($encoder);

			return $user;
		});

		$manager->flush();
	}
}
