<?php

namespace App\Controller;

use App\Entity\Tour;
use App\Form\TourType;
use App\Repository\TourRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Gedmo\Sluggable\Util\Urlizer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class TourController extends AbstractController
{
    /**
     * @Route("/", name="tour_index", methods={"GET"})
     * @param TourRepository $tourRepository
     * @return Response 
     */
    public function index(TourRepository $tourRepository): Response
    {
        return $this->render('tour/index.html.twig', [
            'tours' => $tourRepository->findAll(),
        ]);
    }

    /**
     * @Route("/tours", name="tour_list", methods={"GET"})
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @param TourRepository $tourRepository
     * @return Response
     */
    public function list(TourRepository $tourRepository): Response
    {
        return $this->render('tour/list.html.twig', [
            'tours' => $tourRepository->findAll(),
        ]);
    }

    /**
     * @Route("/tour/new", name="tour_new", methods={"GET","POST"}, options={"expose"=true})
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @param TourRepository $tourRepository
     * 2@return Response
     */
    public function new(Request $request): Response
    {
        $tour = new Tour();
        $form = $this->createForm(TourType::class, $tour);

        if ($request->isXmlHttpRequest()) {
            $tour->setName($request->request->get('name'));
            $tour->setDuration($request->request->get('duration'));
            $tour->setMaxGroupSize($request->request->get('maxGroupSize'));
            $tour->setDifficulty($request->request->get('difficulty'));
            $tour->setRatings($request->request->get('ratings'));
            $tour->setPrice($request->request->get('price'));
            $tour->setSummary($request->request->get('summary'));
            $tour->setDescription($request->request->get('description'));
            $tour->setLocation($request->request->get('location'));
            $tour->setLatitude($request->request->get('latitude'));
            $tour->setLongitude($request->request->get('longitude'));

            $startDate = new \DateTime($request->request->get('startDate'));
            $tour->setStartDate($startDate);

            // upload image
            $imageCover = $request->files->get('imageCover');
            if ($imageCover) {
                $filename = $this->handleUpload($imageCover);
                $tour->setImageCover($filename);
            }

            // set timestamps
            $tour->updatedTimestamps();

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($tour);
            $entityManager->flush();

            $redirectUrl = $this->generateUrl('tour_list');
            $data = [
                'status' => 'success',
                'url' => $redirectUrl,
                'message' => 'Tour successfully created'
            ];

            return new JsonResponse($data);
        }

        return $this->render('tour/new.html.twig', [
            'tour' => $tour,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/tour/{id}", name="tour_show", methods={"GET"})
     * @param Tour $tour
     * @return Response
     */
    public function show(Tour $tour): Response
    {
        return $this->render('tour/show.html.twig', [
            'tour' => $tour,
        ]);
    }   

    /**
     * @Route("tour/edit/{id}", name="tour_edit", methods={"GET","POST"}, options={"expose"=true})
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @param Request $request
     * @param Tour $tour
     * @return Response
     */
    public function edit(Request $request, Tour $tour): Response
    {
        $form = $this->createForm(TourType::class, $tour);

        if ($request->isXmlHttpRequest()) {
            $tour->setName($request->request->get('name'));
            $tour->setDuration($request->request->get('duration'));
            $tour->setMaxGroupSize($request->request->get('maxGroupSize'));
            $tour->setDifficulty($request->request->get('difficulty'));
            $tour->setRatings($request->request->get('ratings'));
            $tour->setPrice($request->request->get('price'));
            $tour->setSummary($request->request->get('summary'));
            $tour->setDescription($request->request->get('description'));
            $tour->setLocation($request->request->get('location'));
            $tour->setLatitude($request->request->get('latitude'));
            $tour->setLongitude($request->request->get('longitude'));

            $startDate = new \DateTime($request->request->get('startDate'));
            $tour->setStartDate($startDate);

            // upload image
            $imageCover = $request->files->get('imageCover');
            if ($imageCover) {
                $filename = $this->handleUpload($imageCover);
                $tour->setImageCover($filename);
            }

            // set timestamps
            $tour->updatedTimestamps();

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($tour);
            $entityManager->flush();

            $redirectUrl = $this->generateUrl('tour_list');
            $data = [
                'status' => 'success',
                'url' => $redirectUrl,
                'message' => 'Tour successfully edited'
            ];

            return new JsonResponse($data);
        }

        return $this->render('tour/edit.html.twig', [
            'tour' => $tour,
            'form' => $form->createView(),
        ]);
    }
    /**
     * @param object $file
     * @return string
     */
    private function handleUpload($file)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $filename = Urlizer::urlize($originalFilename).'-'.uniqid().'.'.$file->guessExtension();
        $uploads_directory = $this->getParameter('uploads_directory').'/tours';
        $file->move($uploads_directory, $filename);

        return $filename;
    }

    /**
     * @Route("tour/delete/{id}", name="tour_delete", options={"expose"=true})
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @param Request $request
     * @param Tour $tour
     * @return Response
     */
    public function delete(Request $request, Tour $tour): Response
    {
        if ($request->isXmlHttpRequest()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($tour);
            $entityManager->flush();

            $data = [
                'status' => 'success',
                'message' => 'Tour successfully deleted'
            ];
            return new JsonResponse($data);
        }
    }
}