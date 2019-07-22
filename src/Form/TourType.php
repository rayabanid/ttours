<?php

namespace App\Form;

use App\Entity\Tour;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Validator\Constraints\File;

class TourType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', HiddenType::class)
            ->add('name', TextType::class, [
                'required' => true
            ])
            ->add('duration', TextType::class, [
                'required' => true
            ])
            ->add('maxGroupSize', TextType::class, [
                'required' => true
            ])
            ->add('difficulty', ChoiceType::class, [
                'choices' => [
                    'Easy' => 'easy',
                    'Medium' => 'medium',
                    'Difficult' => 'difficult'
                ]
            ])
            ->add('ratings', TextType::class, [
                'required' => true
            ])
            ->add('price', TextType::class, [
                'required' => true
            ])
            ->add('summary', TextareaType::class, [
                'required' => false
            ])
            ->add('description', TextareaType::class, [
                'required' => false
            ])
            ->add('imageCover', FileType::class, [
                'required' => false,
                'data_class' => null,
                'constraints' => [
                    new File([
                        'mimeTypes' => [
                            'image/png',
                            'image/jpeg',
                        ],
                        'mimeTypesMessage' => 'Please upload a valid file',
                    ])
                ]
            ])
            ->add('location', TextType::class, [
                'required' => true
            ])
            ->add('latitude', TextType::class, [
                'required' => true
            ])
            ->add('longitude', TextType::class, [
                'required' => true
            ])
            ->add('startDate', DateType::class, [
                'widget' => 'single_text',
                'required' => true,
                'format' => 'yyyy-mm-dd',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Tour::class,
        ]);
    }
}
