<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;

abstract class AppFixtures extends Fixture
{
	// ObjectManager
	private $manager;

	// Generator
	protected $faker;

	abstract protected function loadData(ObjectManager $manager);

    public function load(ObjectManager $manager)
    {
    	$this->manager = $manager;
    	$this->faker = Factory::create();

    	$this->loadData($manager);

        // $product = new Product();
        // $manager->persist($product);

        // $manager->flush();
    }

    protected function createMany(string $className, int $count, callable $factory)
    {
    	for ($i = 0; $i < $count; $i++) {
    		$entity = new $className();
    		$factory($entity, $i);

    		$this->manager->persist($entity);
    		// store for usage later
    		$this->addReference($className . '_' . $i, $entity);
    	}
    }
}
